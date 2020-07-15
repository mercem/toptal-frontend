import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Menu, Table } from 'semantic-ui-react';

const UserList = ({ users }) => {
  const history = useHistory();

  return (
    <div>
      <Table celled selectable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>E-Mail</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(({ _id, email, firstName, lastName, country, city }) => (
            <Table.Row
              key={_id}
              onClick={() => history.push(`profile/${_id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{firstName}</Table.Cell>
              <Table.Cell>{lastName}</Table.Cell>
              <Table.Cell>{country}</Table.Cell>
              <Table.Cell>{city}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row className="user-list-footer-row">
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>

                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default UserList;
