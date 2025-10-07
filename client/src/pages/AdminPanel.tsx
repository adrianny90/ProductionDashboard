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
    <div className="p-10 ">
      <h1 className="text-3xl font-bold text-center py-14 text-purple-600">
        Admin Panel - User Management
      </h1>
      <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>First Name</TableCell>
              <TableCell sx={{ color: "white" }}>Last Name</TableCell>
              <TableCell sx={{ color: "white" }}>Role</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: "white" }}>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      size="small"
                      sx={{
                        color: "white", // Kolor tekstu ogólny
                        "& .MuiInputLabel-root": { color: "grey.300" }, // Kolor labela
                        "& .MuiOutlinedInput-input": { color: "white" }, // Kolor tekstu w polu
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "grey.500" }, // Opcjonalnie: obramowanie
                        },
                      }}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.firstName || ""}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      size="small"
                      // colors below are added becuase by default they are black, but bg-color is already black, it is done according to what was checked in internet
                      sx={{
                        color: "white",
                        "& .MuiInputLabel-root": { color: "grey.300" },
                        "& .MuiOutlinedInput-input": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "grey.500" },
                        },
                      }}
                    />
                  ) : (
                    user.firstName
                  )}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.lastName || ""}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      size="small"
                      sx={{
                        color: "white",
                        "& .MuiInputLabel-root": { color: "grey.300" },
                        "& .MuiOutlinedInput-input": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "grey.500" },
                        },
                      }}
                    />
                  ) : (
                    user.lastName
                  )}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {editingId === user.id ? (
                    <TextField
                      value={editUser?.role || ""}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      size="small"
                      sx={{
                        color: "white",
                        "& .MuiInputLabel-root": { color: "grey.300" },
                        "& .MuiOutlinedInput-input": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "grey.500" },
                        },
                      }}
                    />
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
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
