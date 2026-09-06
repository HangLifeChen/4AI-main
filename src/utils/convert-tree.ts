// export const buildTree = (nodes: any[]) => {
//   const pathMap = new Map();
//   const tree: any[] = [];

//   for (const node of nodes) {
//     const fullPath = node.file_path === '/'
//       ? `/${node.file_name}`
//       : `${node.file_path}/${node.file_name}`;
//     node.children = [];
//     pathMap.set(fullPath, node);
//   }

//   for (const node of nodes) {
//     const parentPath = node.file_path;
//     if (parentPath === '/') {
//       tree.push(node);
//     } else {
//       const parent = pathMap.get(parentPath);
//       if (parent && parent.file_type === 'dir') {
//         parent.children.push(node);
//       }
//     }
//   }
//   return tree;
// }

export const buildTree = (nodes: any[]) => {

  nodes.sort((a, b) => {
    if (a.file_type === 'dir' && b.file_type !== 'dir') {
      return -1;
    } else if (a.file_type !== 'dir' && b.file_type === 'dir') {
      return 1;
    }
    return 0;
  });

  const pathMap = new Map();
  const tree: any[] = [];

  for (const node of nodes) {
    const fullPath = node.file_path === '/'
      ? `/${node.file_name}`
      : `${node.file_path}/${node.file_name}`;
    node.children = [];
    pathMap.set(fullPath, node);
  }

  for (const node of nodes) {
    const parentPath = node.file_path;
    if (parentPath === '/') {
      tree.push(node);
    } else {
      const parent = pathMap.get(parentPath);
      if (parent && parent.file_type === 'dir') {
        parent.children.push(node);
      }
    }
  }

  return tree;
};


export const filterTree = (tree, targetId) => {
  for (const node of tree) {
    if (node.id === targetId) return node;
    if (node.children?.length) {
      const result = filterTree(node.children, targetId);
      if (result) return result;
    }
  }
  return null;
}