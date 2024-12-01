const { generateRandomId, generateUuidWithoutDashes } = require("../utils/idGenerator");
const { listIDSchema, addListSchema, updateListSchema } = require("../validations/shoppingListValidation");

const shoppingLists = [
    {
      id: generateRandomId(),
      owner: generateRandomId(),
      archived: false,
      name: "Nákupní seznam 1",
      items: [
        { id: generateRandomId(), solved: false },
        { id: generateRandomId(), solved: true },
      ],
      members: [{ id: generateRandomId() }, { id: generateRandomId() }],
    },
    {
      id: generateRandomId(),
      owner: generateRandomId(),
      archived: true,
      name: "Nákupní seznam 2",
      items: [],
      members: [{ id: generateRandomId() }, { id: generateRandomId() }],
    },
    {
      id: generateRandomId(),
      owner: generateRandomId(),
      archived: false,
      name: "Nákupní seznam 3",
      items: [],
      members: [{ id: generateRandomId() }, { id: generateRandomId() }],
    },
    {
      id: generateRandomId(),
      owner: generateRandomId(),
      archived: true,
      name: "Nákupní seznam 4",
      items: [],
      members: [{ id: generateRandomId() }, { id: generateRandomId() }],
    },
    {
      id: generateRandomId(),
      owner: generateRandomId(),
      archived: false,
      name: "Nákupní seznam 5",
      items: [],
      members: [{ id: generateRandomId() }, { id: generateRandomId() }],
    },
    {
      id: generateRandomId(),
      owner: generateRandomId(),
      archived: false,
      name: "Nákupní seznam 6",
      items: [],
      members: [{ id: generateRandomId() }, { id: generateRandomId() }],
    }
  ];

const getActiveLists = (req, res) => {
  const archived = req.query.archived === "true";
  try {
    const data = shoppingLists
      .filter((list) => list.archived === archived)
      .map((list) => ({
        id: list.id,
        owner: list.owner,
        archived: list.archived,
        name: list.name,
        items: list.items.map((item) => ({
          id: item.id,
          solved: item.solved.toString(),
        })),
        members: list.members.map((member) => ({
          id: member.id,
        })),
      }));

    res.status(200).json({ data, uuAppErrorMap: {} });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", uuAppErrorMap: {} });
  }
};

const getArchivedLists = (req, res) => {
    try {
      const data = shoppingLists
        .filter((list) => list.archived)
        .map((list) => ({
          id: list.id,
          owner: list.owner,
          archived: list.archived,
          name: list.name,
          items: list.items.map((item) => ({
            id: item.id,
            solved: item.solved.toString(),
          })),
          members: list.members.map((member) => ({
            id: member.id,
          })),
        }));
  
      res.status(200).json({ data, uuAppErrorMap: {} });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", uuAppErrorMap: {} });
    }
  };

const getListById = (req, res) => {
  const { error } = listIDSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const list = shoppingLists.find((list) => list.id === req.params.listID);
  if (!list) return res.status(404).json({ error: "List not found" });

  res.status(200).json({ data: list, uuAppErrorMap: {} });
};

const addList = (req, res) => {
  const { error } = addListSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, items, members } = req.body;
  const newList = {
    id: generateUuidWithoutDashes(),
    owner: generateUuidWithoutDashes(),
    name,
    items: items || [],
    members: members || [],
    archived: false,
  };

  shoppingLists.push(newList);
  res.status(201).json({ message: "List added successfully", data: newList });
};

const updateList = (req, res) => {
  const paramError = listIDSchema.validate(req.params).error;
  const bodyError = updateListSchema.validate(req.body).error;
  if (paramError || bodyError)
    return res.status(400).json({ error: paramError?.details[0]?.message || bodyError?.details[0]?.message });

  const list = shoppingLists.find((list) => list.id === req.params.listID);
  if (!list) return res.status(404).json({ error: "List not found" });

  Object.assign(list, req.body);
  res.status(200).json({ message: "List updated successfully", data: list });
};

const deleteList = (req, res) => {
  const { error } = listIDSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const index = shoppingLists.findIndex((list) => list.id === req.params.listID);
  if (index === -1) return res.status(404).json({ error: "List not found" });

  shoppingLists.splice(index, 1);
  res.status(200).json({ message: "List deleted successfully" });
};

module.exports = { 
    getActiveLists, 
    getArchivedLists,
    getListById, 
    addList, 
    updateList, 
    deleteList
};