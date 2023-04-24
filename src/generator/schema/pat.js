export default {
  required: ["name", "photoUrls", "id", "category", "tags", "status"],
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "int64",
      minimum: 1,
      maximum: 5000,
      mock: {
        mock: "@natural",
      },
      description: "宠物ID编号",
    },
    category: {
      $ref: "#/definitions/1772391",
      description: "分组",
    },
    name: {
      type: "string",
      description: "名称",
      mock: {
        mock: "@cword(3)",
      },
      examples: ["doggie"],
      minLength: 4,
      maxLength: 66,
      pattern: "[1-2]",
      xml: {
        name: "ssddd",
        prefix: "ss",
        namespace: "ss",
        "x-attributes": [
          {
            name: "ss",
            value: "33",
          },
        ],
      },
      default: "23232",
      format: "date-time",
    },
    photoUrls: {
      type: "array",
      items: {
        type: ["string", "null"],
        mock: {
          mock: "@image",
        },
      },
      description: "照片URL",
      xml: {
        name: "photoUrl",
        wrapped: true,
      },
      maxItems: 2,
      minItems: 1,
    },
    tags: {
      type: "array",
      xml: {
        name: "tag",
        wrapped: true,
      },
      items: {
        $ref: "#/definitions/1772392",
      },
      description: "标签",
    },
    status: {
      type: "string",
      description: "宠物销售状态",
      enum: ["available", "pending", "sold"],
    },
  },
  xml: {
    name: "Pet",
  },
  "x-apifox-orders": ["id", "category", "name", "photoUrls", "tags", "status"],
  handle(number) {
    return number + 1
  }
};
