import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    users {
      data {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($username: String, $email: String) {
    createUser(input: { username: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, input: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;
export const USER_UPDATED_SUBSCRIPTION = gql`
  subscription OnUserUpdated {
    userUpdated {
      id
      name
      email
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteUser(id: $id)
  }
`;
export const USER_DELETED_SUBSCRIPTION = gql`
  subscription DeleteCustomer($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const GET_FONT_DASHBOARD_STATS = gql`
  query GetFontDashboardStats {
    fontDashboardStats {
      confirmedProductionFonts {
        count
        limit
      }
      activationsAndMarketIntelligence
      uniqueFontStylesExplored
    }
  }
`;
