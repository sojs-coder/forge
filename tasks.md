I have updated child syntax from
Part.children["NAME"] to Part.child<Type>("NAME" or "TYPE")
This function retrieves a child by name, if it does not exist, it checks for children of a specific type and returns the first one.

---
Go through each Part in the folder @Parts and ensure that they are using the new child retrieving syntax, and also give them a specific type property. For Parts that should be unique among siblings (Such as a particleemitter, AreaTrigger, Health, etc), remove the name option in the constructor and set it to be the same as the type (eg: "Health" for health.)

---
Please do the following: Read through the documentation in @docs directory and ensure that each class is fully documented with:

- Description of the Part/Usage
- Properties
- Methods
- Constructor definition
- Example usage

Much of the current documentation is lacking updated properties/methods and constructor definitions.

---
In @engine/editor/definitions.ts, do the following:
- update every single NodeDefinition to represent the actual class
- add a description to each property
- properly document the "unique among siblings" classes with the "singular: true" property.


---
In @engine/editor/properties.ts, show the property description when the user hovers over the property label.