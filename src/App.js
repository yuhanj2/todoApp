import React, { Fragment, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SvgIcon from '@material-ui/core/SvgIcon';
import TodoList from './Components/TodoList';
import priorities from "./Constants/priorities";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import AddTodoItemMenu from "./Components/AddTodoItemMenu";
import {useDispatch, useSelector} from "react-redux";
import * as todoActions from "./Actions/todoActions"

// The icon on the top
function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

// integrate css styles here
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    createNewButton: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function App(props) {
    const classes = useStyles();
    const todoItems = useSelector((state) => state.todoItems);
    const createNew = useSelector((state) => state.createNew);
    const dispatch = useDispatch();

    const hideOrShowMenu = () => {
        dispatch(todoActions.toggleCreateNew());
    }

    const sortByDueTime = () => {
        dispatch(todoActions.sortByDueTime());
    }

    const sortByPriority = () => {
        dispatch(todoActions.sortByPriority());
    }

    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <HomeIcon />
                </Avatar>

                <Typography gutterBottom={true} component="h1" variant="h5">
                    {"Todo App"}
                </Typography>

                <TodoList/>

                {createNew? <AddTodoItemMenu/> : <div/>}

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.createNewButton}
                    onClick={hideOrShowMenu}
                >
                    创建新待办事项
                </Button>

                { (todoItems.length > 1)?
                    (
                    <div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.createNewButton}
                            onClick={sortByDueTime}
                        >
                            按照截止时间排序
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.createNewButton}
                            onClick={sortByPriority}
                        >
                            按照优先级别排序
                        </Button>
                </div>
                ): <div/>}

            </div>

        </Container>
    );
}
