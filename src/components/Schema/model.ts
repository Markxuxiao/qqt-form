interface TreeNode {
  id: string;
  children?: TreeNode[];
}

export class treeClass {
  private data: TreeNode;
  constructor(data: TreeNode) {
    this.data = data;
  }
  // 方法1：根据节点id返回节点除children属性以外的节点信息
  getNodeById(id, node = this.data) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const match = this.getNodeById(id, child);
        if (match) {
          return match;
        }
      }
    }
    return null;
  }
  // 方法5：根据节点id删除此节点
  deleteNodeById(id: string): boolean {
    const parentNode = this.getParentNodeById(id);
    if (parentNode) {
      const index = parentNode.children.findIndex((child) => child.id === id);
      if (index >= 0) {
        parentNode.children.splice(index, 1);
        return true;
      }
    }
    throw new Error(`deleteNodeById ${id}`);
  }
  // 方法2：根据节点id返回父节点信息除children属性以外的节点信息
  getParentNodeById(id: string, node = this.data): TreeNode | null {
    if (node.children) {
      for (const child of node.children) {
        if (child.id === id) {
          return node;
        }
        const match = this.getParentNodeById(id, child);
        if (match) {
          return match;
        }
      }
    }
    return null;
  }
  insertNode(
    currentNodeId: string,
    targetNodeId: string,
    isBefore = false
  ): boolean {
    const currentNode = this.getNodeById(currentNodeId);
    this.deleteNodeById(currentNodeId);
    const parentNode = this.getParentNodeById(targetNodeId);
    if (parentNode) {
      let index = parentNode.children.findIndex(
        (child) => child.id === targetNodeId
      );
      if (index >= 0) {
        !isBefore && (index = index + 1);
        parentNode.children.splice(index, 0, currentNode);
        return true;
      }
    }
    throw new Error(
      `insertNode currentNodeId：${currentNodeId} targetNodeId：${targetNodeId}`
    );
  }
  // 方法3：根据当前节点id和目标节点id，把当前节点id插入到目标节点id前面
  insertBefore(currentNodeId: string, targetNodeId: string): boolean {
    return this.insertNode(currentNodeId, targetNodeId, true);
  }
  // 方法4：根据当前节点id和目标节点id，把当前节点id插入到目标节点id后面
  insertAfter(currentNodeId: string, targetNodeId: string): boolean {
    return this.insertNode(currentNodeId, targetNodeId, false);
  }
}
