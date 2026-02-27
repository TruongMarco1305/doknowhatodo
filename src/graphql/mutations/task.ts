import { gql } from "@apollo/client";

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: String!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const CREATE_TASK = gql`
    mutation CreateTask($data: TaskCreateInput!) {
        createTask(data: $data) {
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
