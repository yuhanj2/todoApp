import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import * as todoActions from '../Actions/todoActions';
import DateTimePicker from 'react-datetime-picker';
import ListItem from "@material-ui/core/ListItem";
import blue from "@material-ui/core/colors/blue";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import {List} from "@material-ui/core";
import priorities from "../Constants/priorities";

// css styles，属于material ui api
const useStyles = makeStyles((theme) =>({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// 添加新的待办事项所使用的表格
export default function EditTodoItemMenu(props){
    // 整合上面的css style，属于material ui api
    const classes = useStyles();
    // 使用useSelector() hook 来让当前component读取redux中的state
    const currContent = useSelector((state) => state.currContent);
    const error = useSelector((state) => state.error);
    const dueTime = useSelector((state) => state.currDueTime);
    const currPriority = useSelector((state) => state.currPriority);
    const dispatch = useDispatch();

    const handleContentChange = (event) => {
        const newContent = event.target.value;
        dispatch(todoActions.setError(""));
        dispatch(todoActions.setNewContent(newContent));
    }

    const handleDateTimeChange = (event) => {
        //console.log(event);
        dispatch(todoActions.setNewDueTime(event));
    }

    const translatePriority = () => {
        if(currPriority === priorities.GENERAL){
            return "普通";
        }
        if(currPriority === priorities.IMPORTANT){
            return "重要";
        }
        if(currPriority === priorities.URGENT){
            return "紧急";
        }
    }

    const handleClick = (e) => {
        if(currContent.length === 0){
            dispatch(todoActions.setError("代办事项内容不能为空"));
            return;
        }
        dispatch(todoActions.editItem());
    }

    const hideMenu = () => {
        dispatch(todoActions.toggleEdit());
    }

    const setUrgent = () => {
        dispatch(todoActions.setNewPriority(priorities.URGENT));
    }

    const setImportant = () => {
        dispatch(todoActions.setNewPriority(priorities.IMPORTANT));
    }

    const setGeneral = () => {
        dispatch(todoActions.setNewPriority(priorities.GENERAL));
    }

    return (
        <Container component="main" maxWidth="sm" >
            <form className={classes.form}>
                <TextField
                    id="content"
                    value={currContent}
                    onChange={handleContentChange}
                    margin="normal"
                    error={error != ''}
                    placeholder={error}
                    required
                    fullWidth
                    label="修改现有的待办事项内容"
                    multiline
                    variant="outlined"
                />

                <div>请选择截止时间：</div>

                <DateTimePicker
                    onChange={handleDateTimeChange}
                    value={dueTime}
                    disableClock={true}
                />

                <List>
                    <ListItem style={{backgroundColor: blue[50]}}>
                        <ListItemText primary={"请选择优先级"} />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={setUrgent} >
                                <FiberManualRecordIcon fontSize="large" style={{color: red[500]}} />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={setImportant} >
                                <FiberManualRecordIcon fontSize="large" style={{color: orange[500]}} />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={setGeneral} >
                                <FiberManualRecordIcon fontSize="large" style={{color: blue[500]}} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem style={{backgroundColor: blue[50]}}>
                        <ListItemText primary={"目前优先级：" + translatePriority()}  />
                    </ListItem>
                </List>

                <div>
                    <Button
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        确认修改
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={hideMenu}
                        className={classes.submit}
                    >
                        取消添加
                    </Button>
                </div>
            </form>
        </Container>
    )
}