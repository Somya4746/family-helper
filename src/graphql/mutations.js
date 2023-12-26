/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
      id
      title
      description
      listItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
      id
      title
      description
      listItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
      id
      title
      description
      listItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createListItem = /* GraphQL */ `
  mutation CreateListItem(
    $input: CreateListItemInput!
    $condition: ModelListItemConditionInput
  ) {
    createListItem(input: $input, condition: $condition) {
      id
      title
      quantity
      done
      listID
      list {
        id
        title
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      actions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateListItem = /* GraphQL */ `
  mutation UpdateListItem(
    $input: UpdateListItemInput!
    $condition: ModelListItemConditionInput
  ) {
    updateListItem(input: $input, condition: $condition) {
      id
      title
      quantity
      done
      listID
      list {
        id
        title
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      actions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteListItem = /* GraphQL */ `
  mutation DeleteListItem(
    $input: DeleteListItemInput!
    $condition: ModelListItemConditionInput
  ) {
    deleteListItem(input: $input, condition: $condition) {
      id
      title
      quantity
      done
      listID
      list {
        id
        title
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      actions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createAction = /* GraphQL */ `
  mutation CreateAction(
    $input: CreateActionInput!
    $condition: ModelActionConditionInput
  ) {
    createAction(input: $input, condition: $condition) {
      id
      action
      listItemID
      listItem {
        id
        title
        quantity
        done
        listID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateAction = /* GraphQL */ `
  mutation UpdateAction(
    $input: UpdateActionInput!
    $condition: ModelActionConditionInput
  ) {
    updateAction(input: $input, condition: $condition) {
      id
      action
      listItemID
      listItem {
        id
        title
        quantity
        done
        listID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteAction = /* GraphQL */ `
  mutation DeleteAction(
    $input: DeleteActionInput!
    $condition: ModelActionConditionInput
  ) {
    deleteAction(input: $input, condition: $condition) {
      id
      action
      listItemID
      listItem {
        id
        title
        quantity
        done
        listID
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
