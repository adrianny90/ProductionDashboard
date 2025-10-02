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
import { getUsers } from "../hooks/useData";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[] | undefined>();

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editUser, setEditUser] = useState<User | null>(null);
  useEffect(() => {
    const getData = async () => {
      const allUsers = await getUsers();
      //   console.log("all", allUsers);
      setUsers(allUsers);
    };
    getData();
  }, []);
  // Start editing a user
  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditUser({ ...user });
  };

  // Save edited user
  const handleSave = (id: number) => {
    if (editUser) {
      setUsers(users?.map((user) => (user.id === id ? editUser : user)));
      // TODO: Call API to save changes to the backend
      // Example: await updateUser(editUser);
      setEditingId(null);
      setEditUser(null);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditUser(null);
  };

  // Handle input changes for editable fields
  const handleInputChange = (field: keyof User, value: string) => {
    if (editUser) {
      setEditUser({ ...editUser, [field]: value });
    }
  };

  // Handle Reset Password button click
  const handleResetPassword = (userId: number) => {
    // TODO: Implement reset password logic (e.g., API call)
    console.log(`Reset password for user ID: ${userId}`);
    // Example: await resetPassword(userId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel - User Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
                <TableCell>{user.id}</TableCell>
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
                        onClick={() => handleResetPassword(user.id)}
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
