import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicPopover from "../../Components/Imagesavtar";
import {
  alluser as getAllUsers,
  setUsers,
} from "../../store/Users/AlluserAction";
import { CSpinner } from "@coreui/react";

const getPaginated = (array, { page, limit }) => {
  let start = page * limit;
  let end = start + limit;
  return array.slice(start, end);
};

var DATA = {};
export default function DenseTable() {
  const dispatch = useDispatch();
  const {
    alluser = {},
    pageInfo,
    loading,
  } = useSelector((state) => state?.alluser  || null);
  const loginuser = useSelector(state=> state?.profiles?.profile || null)
   console.log("++++++++++Login User" , loginuser)

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
const token = localStorage.getItem('token')

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!getPaginated(alluser || [], { page, limit: rowsPerPage }).length) {
      dispatch(getAllUsers({ page, rowsPerPage }));
    }
  }, [page, rowsPerPage]);

  const handleSubmit = (userId) => {
      axios.delete(`http://localhost:3000/api/delete/${userId}`).then((res) => {
        let newUsers = alluser.filter((single) => single._id !== userId);
        let deletedCount = alluser.length - newUsers.length;
        dispatch(setUsers(newUsers, deletedCount));
        console.log(res);
      })
  };

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const head = {
    background: "linear-gradient(#444 , #999 , #333)",
  };

  
  return (
    <>
      {loading ? (
        <div className="spinner" style={{width:'100%',height : '100vh' , display : 'flex' , justifyContent:'center' ,alignItems:'center'}}>
          Fetching Data...<CSpinner color="danger" className="d-flex align-center" />
        </div>
      ) : (
        <div className="alluser" style={{width:"100%"}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="text-info" align="right">
                  <strong>Full Name</strong>
                </TableCell>
                <TableCell className="text-info" align="right">
                  <strong>User Name</strong>
                </TableCell>
                <TableCell className="text-info" align="right">
                  <strong>Images</strong>
                </TableCell>
                <TableCell className="text-info" align="right">
                  <strong>Email</strong>
                </TableCell>
                <TableCell className="text-info" align="right">
                  <strong>Phone</strong>
                </TableCell>
                <TableCell className="text-info" align="right">
                  <strong>Gender</strong>
                </TableCell>
                <TableCell className="text-info" align="right">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
        
            <TableBody>
              {alluser &&
                getPaginated(alluser, { page, limit: rowsPerPage })?.map(
                  (row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="text-success" align="right">
                        {row.fullname}
                      </TableCell>
                      <TableCell className="text-danger" align="right">
                        {row.username}
                      </TableCell>
                      <TableCell className="text-danger" align="right">
                        <BasicPopover file={row.file} />{" "}
                      </TableCell>
                      <TableCell className="text-primary" align="right">
                        {row.email}
                      </TableCell>
                      <TableCell className="text-darks" align="right">
                        {row.phone}
                      </TableCell>
                      <TableCell className="text-warning" align="right">
                        {row.gender}
                      </TableCell>
                      <TableCell className="text-dark" align="right">
                        {loginuser?._id !== row?._id && (
                          <Button
                          className="btn btn-info mx-1"
                          style={{
                            border: "2px solid black",
                            height: "30px",
                            background: "#555",
                            color: "#fff",
                          }}
                            onClick={() => handleSubmit(row._id)}
                            disabled={alluser.token}
                          >
                            Delete
                          </Button> 
                        )} 
                        
                        

                        <Button
                          className="btn btn-info mx-1"
                          style={{
                            border: "2px solid black",
                            height: "30px",
                            background: "#555",
                          }}
                        >
                          <Link
                            style={{ color: "white", textDecoration: "none" }}
                            to={`/users/edit/${row?._id}`}
                          >
                            {" "}
                            Edit
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={pageInfo.count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        </div>
      )}
    </>
  );
}
