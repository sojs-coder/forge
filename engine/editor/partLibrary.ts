import { updateCustomNodesList } from "./customNodes";
import { nodeDefinitions } from "./definitions";
import { showNotification } from "./notification";
import { supabase, supabaseUrl, uprofile } from "./supabase";
import type { CustomNodeRow, PartLibrarySearchResult } from "./types";
import { Converter } from "showdown";

const openLibraryButton = document.getElementById('open-library-button') as HTMLButtonElement;
const libraryContainer = document.getElementById('node-library') as HTMLDivElement;
const libraryResults = document.getElementById('node-library-results') as HTMLDivElement;
const closeLibraryButton = document.getElementById('close-library-button') as HTMLButtonElement;
const searchInput = document.getElementById('node-library-search') as HTMLInputElement;

export function initializePartLibrary() {
    openLibraryButton.addEventListener('click', openLibrary);
    closeLibraryButton.addEventListener('click', closeLibrary);
    searchInput.addEventListener('input', searchParts);

}
function openLibrary() {
    libraryContainer.classList.add('open');
    searchInput.value = '';
    libraryResults.innerHTML = '';
    loadTop10Parts();
}
function closeLibrary() {
    libraryContainer.classList.remove('open');
    searchInput.value = '';
    libraryResults.innerHTML = '';
}


async function searchParts() {
    const query = searchInput.value.trim();
    const results = await searchPartLibrary(query);
    if (results) {
        loadParts(results);
    }
}
async function loadTop10Parts() {
    const { data, error } = await supabase
        .from('custom_nodes')
        .select('*, u_profiles(display_name)')
        .order('upvotes', { ascending: false })
        .limit(10)
    if (error) {
        console.error('Error loading top parts:', error);
        showNotification('Failed to load top parts. Please try again.', 'error');
        return;
    }

    if (data.length === 0) {
        libraryResults.innerHTML = '<p>No parts found.</p>';
        return;
    }

    loadParts(data);
}
async function checkUserUpvote(partId: string | undefined, upvoteDiv: HTMLDivElement): Promise<boolean> {
    if (!partId) return false;
    if (!uprofile) {
        try {
            await new Promise((resolve, reject) => {
                const mutationObserver = new MutationObserver(() => {
                    if (document.getElementById('logged-in')?.getAttribute('data-logged-in') === '1') {
                        mutationObserver.disconnect();
                        resolve(true);
                    }
                });
                mutationObserver.observe(document.getElementById('logged-in')!, {
                    attributes: true,
                    childList: false,
                    subtree: false
                });
                setTimeout(() => {
                    mutationObserver.disconnect();
                    reject(new Error('User not logged in'));
                }, 3000); // Timeout after 3 seconds
            });
        } catch (error) {
            return false;
        }
    }
    const { data: upvoteData, error: upvoteError } = await supabase
        .from('upvotes')
        .select('id')
        .eq('part_id', partId)
        .eq('user_id', uprofile?.id);
    if (upvoteError) {
        console.error('Error checking upvote:', upvoteError);
        return false;
    }
    let hasUpvoted = upvoteData.length > 0;
    if (hasUpvoted) {
        upvoteDiv.classList.add('upvoted');
    } else {
        upvoteDiv.classList.remove('upvoted');
    }
    upvoteDiv.addEventListener('click', async (e) => {
        // if (e.target !== upvoteDiv) return; // Prevent event bubbling
        e.stopPropagation();
        if (!uprofile) {
            showNotification('Please log in to upvote parts.', 'info');
            return;
        }
        if (hasUpvoted) {
            // User has already upvoted, remove the upvote
            const { error: deleteError } = await supabase.rpc(
                "unvote",
                { p_custom_node_id: partId }
            )
            if (deleteError) {
                console.error('Error removing upvote:', deleteError);
                showNotification('Failed to remove upvote. Please try again.', 'error');
                return;
            } else {
                if (upvoteDiv.classList.contains('upvoted')) {
                    hasUpvoted = false;
                    upvoteDiv.classList.remove('upvoted');
                    const newVotes = parseInt(upvoteDiv.getAttribute('data-votes') || '0') - 1;
                    upvoteDiv.setAttribute('data-votes', String(newVotes));
                    const upvoteCountSpan = upvoteDiv.querySelector('.upvote-count') as HTMLSpanElement;
                    upvoteCountSpan.textContent = String(newVotes);
                    showNotification('Upvote removed successfully!', 'success');
                }
            }
        } else {
            const { error: insertError } = await supabase
                .rpc(
                    "upvote",
                    { p_custom_node_id: partId }
                )
            if (insertError) {
                console.error('Error upvoting part:', insertError);
                showNotification('Failed to upvote part. Please try again.', 'error');
                return;
            } else {
                if (!upvoteDiv.classList.contains('upvoted')) {
                    hasUpvoted = true;
                    upvoteDiv.classList.add('upvoted');
                    const newVotes = parseInt(upvoteDiv.getAttribute('data-votes') || '0') + 1;
                    upvoteDiv.setAttribute('data-votes', String(newVotes));
                    const upvoteCountSpan = upvoteDiv.querySelector('.upvote-count') as HTMLSpanElement;
                    upvoteCountSpan.textContent = String(newVotes);
                    showNotification('Part upvoted successfully!', 'success');
                }
            }
        }
    });
    return hasUpvoted;
}
async function loadParts(parts: PartLibrarySearchResult[]) {
    libraryResults.innerHTML = '';
    parts.forEach(async (part: PartLibrarySearchResult) => {
        const partElement = document.createElement('div');
        partElement.className = 'part-item';

        if (part.featured_image) {
            const img = document.createElement('img');
            img.src = part.featured_image;
            img.alt = part.name;
            partElement.appendChild(img);
        }

        const name = part.name || 'Unnamed Part';
        const author = part.u_profiles?.display_name || 'Unknown Author';
        const upvoteDiv = document.createElement('div');
        upvoteDiv.className = 'upvote-container';
        upvoteDiv.id = `upvote-${part.id}`;
        upvoteDiv.setAttribute('data-votes', String(part.upvotes));
        const upvoteIconSpan = document.createElement('span');
        upvoteIconSpan.className = 'upvote-icon';
        upvoteIconSpan.textContent = '▲';

        const upvoteCountSpan = document.createElement('span');
        upvoteCountSpan.className = 'upvote-count';
        upvoteCountSpan.textContent = String(part.upvotes);

        upvoteDiv.appendChild(upvoteIconSpan);
        upvoteDiv.appendChild(upvoteCountSpan);

        const nameStrong = document.createElement('strong');
        nameStrong.textContent = name;

        const byText = document.createTextNode(' by ' + author);

        const useButton = document.createElement('button');
        useButton.textContent = 'Use Part';
        useButton.onclick = (e) => {
            e.stopPropagation();
            usePart(part);
        };

        partElement.appendChild(upvoteDiv);
        await checkUserUpvote(part.id, upvoteDiv);
        partElement.appendChild(nameStrong);
        partElement.appendChild(byText);
        partElement.appendChild(useButton);

        partElement.onclick = (e) => {
            const arr = Array.from(upvoteDiv.childNodes as NodeListOf<HTMLElement>);
            if (e.target === useButton || e.target === upvoteDiv || arr.includes(e.target as HTMLElement)) return; // Prevent opening details on button clicks
            e.stopPropagation();
            showPartDetails(part, upvoteDiv);
        };

        libraryResults.appendChild(partElement);
    });
}

function usePart(part: CustomNodeRow) {
    if (part.code && part.name) {
        nodeDefinitions[part.name] = {
            properties: part.properties,
            code: part.code,
            children: [],
            singular: part.singular
        };
        showNotification(`Part '${part.name}' added to your project!`, 'success');
        updateCustomNodesList();
        closeLibrary();
    } else {
        showNotification('This part is missing code and cannot be used.', 'error');
    }
}

async function showPartDetails(part: PartLibrarySearchResult, uDiv: HTMLElement) {
    const detailModal = document.createElement('div');
    detailModal.className = 'modal part-detail-modal';
    const upvotes = parseInt(uDiv.getAttribute('data-votes') || part.upvotes.toString());
    let slideshowHtml = '';
    if (part.showcase_files && part.showcase_files.length > 0) {
        slideshowHtml = `
            <div class="slideshow-container">
                ${part.showcase_files.map((file, index) => {
            const fileType = file.split('.').pop()?.toLowerCase();
            if (['mp4', 'webm', 'ogg'].includes(fileType || '')) {
                return `<video class="slide ${index === 0 ? 'active' : ''}" autoplay controls muted loop playsinline>
                            <source src="${file}" type="video/${fileType}">
                        </video>`;
            }
            return `<img src="${file}" class="slide ${index === 0 ? 'active' : ''}" alt="Showcase image">`;
        }).join('')}
                <a class="prev">&#10094;</a>
                <a class="next">&#10095;</a>
            </div>
        `;
    }

    let documentationHtml = '';
    if (part.documentation_file) {
        try {
            const response = await fetch(part.documentation_file);
            if (response.ok) {
                const markdown = await response.text();
                const converter = new Converter();
                // Basic markdown to HTML conversion
                documentationHtml = converter.makeHtml(markdown);
            }
        } catch (error) {
            console.error('Error fetching documentation:', error);
        }
    }

    detailModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 class="name"><span>${part.name}</span></h2>
            <p>by ${part.u_profiles?.display_name || 'Unknown Author'}</p>
            <p>${part.description}</p>
            ${slideshowHtml}
            <div class="documentation-content">
                <h3>Documentation</h3>
                ${documentationHtml || '<p>No documentation provided.</p>'}
            </div>
        </div>
    `;
    const useButton = document.createElement('button');
    useButton.textContent = 'Use Part';
    useButton.onclick = (e) => {
        e.stopPropagation();
        detailModal.remove();
        usePart(part);
    };
    const upvoteDiv = document.createElement('div');
    upvoteDiv.className = 'upvote-container inline';
    upvoteDiv.id = `upvote-${part.id}`;
    upvoteDiv.setAttribute('data-votes', String(upvotes));
    const upvoteIconSpan = document.createElement('span');
    upvoteIconSpan.className = 'upvote-icon';
    upvoteIconSpan.textContent = '▲';

    const upvoteCountSpan = document.createElement('span');
    upvoteCountSpan.className = 'upvote-count';
    upvoteCountSpan.textContent = String(upvotes);

    upvoteDiv.appendChild(upvoteIconSpan);
    upvoteDiv.appendChild(upvoteCountSpan);
    await checkUserUpvote(part.id, upvoteDiv);
    detailModal.querySelector('.modal-content h2.name')?.insertBefore(upvoteDiv, detailModal.querySelector('.modal-content h2.name span'));
    detailModal.querySelector('.modal-content')?.appendChild(useButton);


    document.body.appendChild(detailModal);
    detailModal.style.display = 'block';

    detailModal.querySelector('.close-button')?.addEventListener('click', () => {
        detailModal.remove();
    });

    // Slideshow logic
    if (part.showcase_files && part.showcase_files.length > 1) {
        let slideIndex = 0;
        const slides = detailModal.querySelectorAll('.slide');
        const showSlide = (n: number) => {
            slides.forEach(slide => (slide as HTMLElement).style.display = 'none');
            slideIndex = (n + slides.length) % slides.length;
            (slides[slideIndex] as HTMLElement).style.display = 'block';
        };

        detailModal.querySelector('.prev')?.addEventListener('click', () => showSlide(slideIndex - 1));
        detailModal.querySelector('.next')?.addEventListener('click', () => showSlide(slideIndex + 1));

        showSlide(slideIndex);
    }
}

export async function searchPartLibrary(query: string): Promise<PartLibrarySearchResult[] | null> {
    const searchParts = query.trim().toLowerCase().split(' ');
    let data = null;
    let error = null;
    if (searchParts.length == 1) {
        ({ data, error } = await supabase.rpc(
            'search_custom_nodes_by_name_prefix',
            { prefix: searchParts[0] }
        ))
    } else {
        ({ data, error } = await supabase
            .from('custom_nodes')
            .select('*, u_profiles( display_name )')
            .textSearch('name_description', searchParts.join(' | ')));
    }

    const ownerIDs = [...new Set(data.map((part: PartLibrarySearchResult) => part.owner))];
    const { data: profiles, error: profileError } = await supabase
        .from('u_profiles')
        .select('display_name, id')
        .in('id', ownerIDs);

    if (error || profileError) {
        console.error('Error searching part library:', error || profileError);
        return null;
    }
    const enrichedData = data.map((part: PartLibrarySearchResult) => {
        const profile = profiles.find(p => p.id === part.owner);
        return {
            ...part,
            u_profiles: profile ? { display_name: profile.display_name } : null
        };
    });

    return enrichedData;
}
