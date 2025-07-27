/**
 * Validates the chatbot flow according to business rules
 * @param {Array} nodes - Array of flow nodes
 * @param {Array} edges - Array of flow edges
 * @returns {Object} - { isValid: boolean, errorMessage: string }
 */
export const validateFlow = (nodes, edges) => {
  // Rule: More than one node should not have empty target handles
  if (nodes.length > 1) {
    const nodesWithoutTargets = nodes.filter(node => {
      // Check if this node has any incoming edges
      const hasIncomingEdges = edges.some(edge => edge.target === node.id);
      return !hasIncomingEdges;
    });

    if (nodesWithoutTargets.length > 1) {
      return {
        isValid: false,
        errorMessage: 'Cannot save Flow'
      };
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  };
};