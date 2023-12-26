/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
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
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getListItem = /* GraphQL */ `
  query GetListItem($id: ID!) {
    getListItem(id: $id) {
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
export const listListItems = /* GraphQL */ `
  query ListListItems(
    $filter: ModelListItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getAction = /* GraphQL */ `
  query GetAction($id: ID!) {
    getAction(id: $id) {
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
export const listActions = /* GraphQL */ `
  query ListActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        action
        listItemID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listItemsByListID = /* GraphQL */ `
  query ListItemsByListID(
    $listID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelListItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsByListID(
      listID: $listID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const actionsByListItemID = /* GraphQL */ `
  query ActionsByListItemID(
    $listItemID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    actionsByListItemID(
      listItemID: $listItemID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        action
        listItemID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
