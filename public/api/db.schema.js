const { resolve, extend } = require("json-schema-faker");
const fs = require("fs");

extend("faker", () => require("faker"));
const schema = {
  type: "object",
  equired: ["chauffeurs", "clients", "pharmaciens", "factures", "medicaments"],
  properties: {
    chauffeurs: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/users" },
    },
    clients: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/clients" },
    },
    pharmaciens: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/pharmaciens" },
    },
    factures: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/factures" },
    },
    medicament: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/medicament" },
    },
  },
  definitions: {
    chauffeurs: {
      type: "object",
      required: ["id", "name", "cin", "address", "telephone"],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt",
        },
        name: {
          type: "string",
          //faker: "name.firstName",
        },
        cin: {
          type: "string",
          //faker: "name.firstName",
        },
        address: {
          type: "string",
          //faker: "name.firstName",
        },
        telephone: {
          type: "string",
          //faker: "name.firstName",
        },
      },
    },
    clients: {
      type: "object",
      required: ["id", "name", "voiture", "telephone"],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt",
        },
        name: {
          type: "string",
          //faker: "name.firstName",
        },
        voiture: {
          type: "string",
          //faker: "name.firstName",
        },
        telephone: {
          type: "string",
          //faker: "name.firstName",
        },
      },
    },
    pharmacies: {
      type: "object",
      required: ["id", "name", "address", "telephone"],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt",
        },
        name: {
          type: "string",
          //faker: "name.firstName",
        },
        address: {
          type: "string",
          //faker: "name.firstName",
        },
        telephone: {
          type: "string",
          //faker: "name.firstName",
        },
      },
    },
    medicaments: {
      type: "object",
      required: ["id", "name", "price"],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt",
        },
        name: {
          type: "string",
          //faker: "name.firstName",
        },
        price: {
          type: "number",
          //faker: "name.firstName",
        },
      },
    },
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true,
    },
  },
};

resolve(schema).then((sample) => {
  console.log("Writing to db.json");
  fs.writeFile(
    ` ${__dirname} /db.json`,
    JSON.stringify(sample),
    function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("done");
      }
    }
  );
});
