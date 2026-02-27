import { gql } from "@apollo/client";

export const UPDATE_TASK_STATUS = gql`
  mutation ChangeTaskStatus($id: String!, $status: TaskStatus!) {
    changeTaskStatus(taskId: $id, newStatus: $status) {
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
