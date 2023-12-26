/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onCreateList(filter: $filter, owner: $owner) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onUpdateList(filter: $filter, owner: $owner) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onDeleteList(filter: $filter, owner: $owner) {
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
export const onCreateListItem = /* GraphQL */ `
  subscription OnCreateListItem(
    $filter: ModelSubscriptionListItemFilterInput
    $owner: String
  ) {
    onCreateListItem(filter: $filter, owner: $owner) {
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
export const onUpdateListItem = /* GraphQL */ `
  subscription OnUpdateListItem(
    $filter: ModelSubscriptionListItemFilterInput
    $owner: String
  ) {
    onUpdateListItem(filter: $filter, owner: $owner) {
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
export const onDeleteListItem = /* GraphQL */ `
  subscription OnDeleteListItem(
    $filter: ModelSubscriptionListItemFilterInput
    $owner: String
  ) {
    onDeleteListItem(filter: $filter, owner: $owner) {
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
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction(
    $filter: ModelSubscriptionActionFilterInput
    $owner: String
  ) {
    onCreateAction(filter: $filter, owner: $owner) {
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
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction(
    $filter: ModelSubscriptionActionFilterInput
    $owner: String
  ) {
    onUpdateAction(filter: $filter, owner: $owner) {
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
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction(
    $filter: ModelSubscriptionActionFilterInput
    $owner: String
  ) {
    onDeleteAction(filter: $filter, owner: $owner) {
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
