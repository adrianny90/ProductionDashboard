import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { getUsers, updateUsers } from "../hooks/useData";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[] | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    getData();
  }, []);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditUser({ ...user });
  };

  const handleSave = async (id: string) => {
    if (editUser) {
      const payload: User = {
        email: editUser.email,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        id: editUser.id,
        role: editUser.role,
      };

      setUsers(users?.map((user) => (user.id === id ? editUser : user)));
      await updateUsers(id, payload);
      setEditingId(null);
      setEditUser(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditUser(null);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (editUser) {
      setEditUser({ ...editUser, [field]: value });
    }
  };

  const handleResetPassword = (userName: string) => {
    window.alert(`Email, to user: ${userName}, with reset link is sent.`);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center py-14 text-purple-600">
        Admin Panel - User Management
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.firstName || ""}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    user.firstName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.lastName || ""}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    user.lastName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.role || ""}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <>
                      <IconButton
                        onClick={() => handleSave(user.id)}
                        color="primary"
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="secondary">
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEdit(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleResetPassword(user.firstName)}
                        style={{ marginLeft: "10px" }}
                      >
                        Reset Password
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPanel;
