import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { setDashboardCounts, users } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import Posts from "../Posts";
import Pagination from "../../Pages/Pagination/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function DenseTable() {
  const dispatch = useDispatch();

  const userprofiles = useSelector((state) => state?.profiles?.alluser || null);
  const usersData = useSelector((state) => state.profiles.counts || null);

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({})
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // useEffect(() => {
  //   if (!userprofiles) {
  //     axios.get("http://localhost:3000/api/getuser").then((res) => {
  //       dispatch(users(res.data));
  //       setPosts(res.data);
  //       dispatch(setDashboardCounts(res.data.length));
  //     });
  //   }
  // }, [userprofiles]);
  // page = for Page
  // perPage = 
  useEffect(() => {
    axios.get(`http://localhost:3000/api/pages?page=${page}&limit=${rowsPerPage}`).then((res) => {
      // dispatch(users(res.data));
      setPageInfo(res.data.info);
      setUsers(res.data.users);
      dispatch(setDashboardCounts(res.data.length));
    });
  }, [page, rowsPerPage]);

  const handleSubmit = (userId) => {
    axios.delete(`http://localhost:3000/api/delete/${userId}`).then((res) => {
      dispatch(users(userprofiles.filter((single) => single._id !== userId)));
      console.log(res);
    });
  };

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      {/* <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="success">
            <TableRow>
              <TableCell align="right">Full Name</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.fullname}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">
                  {row?._id && (
                    <Button size="small" onClick={() => handleSubmit(row._id)}>
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
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
    </>
  );
}
