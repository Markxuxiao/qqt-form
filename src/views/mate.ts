type MetaData = {
  filed: string;
  title: string;
  type: "title" | "text" | "price" | "number" | "dateTime" | "date";
};
const MetaData: MetaData[] = [
  {
    filed: "code",
    title: "编号",
    type: "title",
  },
  {
    filed: "name",
    title: "名称",
    type: "title",
  },
  {
    filed: "description",
    title: "描述",
    type: "text",
  },
  {
    filed: "price",
    title: "价格",
    type: "price",
  },
  {
    filed: "stock",
    title: "库存",
    type: "number",
  },
  {
    filed: "createTime",
    title: "创建时间",
    type: "dateTime",
  },
];
export default MetaData;
