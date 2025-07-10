import { state } from "./state";
import type { GameNode, NodeDefinition } from "./types";

/**
 * Helper: compress string to Uint8Array using CompressionStream (browser API)
 * Uses TextEncoderStream for efficient streaming.
 */
async function compressString(input: string): Promise<Uint8Array> {
    const encoder = new TextEncoderStream();
    const cs = new CompressionStream("gzip");
    const writer = encoder.writable.getWriter();
    writer.write(input);
    writer.close();
    encoder.readable.pipeTo(cs.writable);
    const compressed = await new Response(cs.readable).arrayBuffer();
    return new Uint8Array(compressed);
}

/**
 * Helper: decompress Uint8Array to string using DecompressionStream (browser API)
 * Uses TextDecoderStream for efficient streaming.
 */
async function decompressToString(input: Uint8Array): Promise<string> {
    if (typeof DecompressionStream === "undefined") {
        throw new Error("DecompressionStream is not supported in this browser.");
    }
    const ds = new DecompressionStream("gzip");
    console.log("Got decomp stream");
    const decoder = new TextDecoderStream();
    console.log("Got decoder stream");
    const inputStream = new Blob([input]).stream();
    console.log("Created input stream from Uint8Array");
    const decompressedStream = inputStream.pipeThrough(ds).pipeThrough(decoder);
    console.log("Piped input stream through decompression and decoding streams");
    const chunks: string[] = [];
    const reader = decompressedStream.getReader();
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log("Decompressed chunk:", value);
        chunks.push(value);
    }
    const decompressed = chunks.join("");
    console.log("Decompressed string:", decompressed);
    return decompressed;
}

/**
 * Export save file as .fesave (compressed, binary)
 */
export async function exportSaveFile(gameTree: GameNode, nodeDefinitions: Record<string, NodeDefinition>) {
    // Remove undefined/null values for smaller output
    const saveData = {
        gameTree: JSON.parse(JSON.stringify(gameTree)),
        nodeDefinitions: JSON.parse(JSON.stringify(nodeDefinitions))
    };
    const json = JSON.stringify(saveData);
    const compressed = await compressString(json);
    const blob = new Blob([compressed], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.gameTree.properties.name || state.gameTree.name}.fesave`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Import save file from .fesave (compressed, binary)
 */
export async function importSaveFile(file: File): Promise<{ gameTree: GameNode, nodeDefinitions: Record<string, NodeDefinition> }> {
    const arrayBuffer = await file.arrayBuffer();
    console.log("Importing save file:", file.name, "Size:", arrayBuffer.byteLength, "bytes");
    if (arrayBuffer.byteLength === 0) {
        throw new Error("Empty save file");
    }
    const decompressed = await decompressToString(new Uint8Array(arrayBuffer));
    console.log("Decompressed save file size:", decompressed.length, "bytes (utf-8)");
    const data = JSON.parse(decompressed);
    console.log("Parsed save file data:", data);
    if (data.gameTree && data.nodeDefinitions) {
        return {
            gameTree: data.gameTree,
            nodeDefinitions: data.nodeDefinitions
        };
    } else {
        throw new Error("Invalid save file format");
    }
}