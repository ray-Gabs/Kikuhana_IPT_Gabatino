import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1c444d",
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    color: "#1c444d",
  },
}));

// eslint-disable-next-line no-unused-vars
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f2fafa",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/User");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users.");
    }
  };

  const handleOpenModal = (user = null) => {
    setIsEditing(!!user);
    setSelectedUser(user);
    if (user) {
      setUserForm({ email: user.email, password: "" });
    } else {
      setUserForm({ email: "", password: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = async () => {
    const { email, password } = userForm;

    if (!email || (!isEditing && !password)) {
      alert("Email and password are required.");
      return;
    }

    try {
      const userData = { email, password };

      if (isEditing) {
        await axios.put(`http://localhost:5000/User/edit`, { ...userData, userId: selectedUser.userId });
      } else {
        await axios.post("http://localhost:5000/User", userData);
      }

      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting user:", error);
      alert("Failed to save user.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/User/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold text-[#b90005] mb-6">Manage Users</h1>

      <Button variant="contained" onClick={() => handleOpenModal()} sx={{ mb: 2 }}>
        Add User
      </Button>

      {/* Back Button */}
      <div className="mb-4">
        <Button onClick={() => navigate("/admin")} variant="outlined">
          Back to Admin Dashboard
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Password</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <StyledTableRow key={user.userId}>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{"***"}</StyledTableCell> 
                <StyledTableCell align="center">
                  <EditIcon sx={{ cursor: "pointer" }} onClick={() => handleOpenModal(user)} />
                  <DeleteIcon sx={{ cursor: "pointer", ml: 1 }} onClick={() => handleDeleteUser(user.userId)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <h2>{isEditing ? "Edit User" : "Add User"}</h2>

          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          />

          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add User"}
          </Button>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
