import { gql } from "@apollo/client";

export const GET_INITIAL_DATA = gql`
  query GetInitialData {
    todoColumn: getTasksByStatus(status: TODO) {
      ...TaskFragment
    }

    progressColumn: getTasksByStatus(status: IN_PROGRESS) {
      ...TaskFragment
    }

    reviewColumn: getTasksByStatus(status: REVIEW) {
      ...TaskFragment
    }

    doneColumn: getTasksByStatus(status: DONE) {
      ...TaskFragment
    }
  }

  fragment TaskFragment on TaskType {
    id
    title
    status
    priority
    deadline
  }
`;

export const GET_TASK_DETAIL = gql`
  query GetTaskDetail($id: ID!) {
    getTaskById(taskId: $id) {
      id
      title
      description
      status
      priority
      deadline
      createdAt
      updatedAt
    }
  }
`;