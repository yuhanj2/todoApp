import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import * as todoActions from '../Actions/todoActions';
import DateTimePicker from 'react-datetime-picker';
import priorities from "../Constants/priorities";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import {List} from "@material-ui/core";

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

// 用于给 Date() 对象添加小时的函数，查了Google，在这篇stack overflow里查到了答案：https://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object
Date.prototype.addHours = function(h){
    this.setHours(this.getHours() + h);
    return this;
}

// 编辑现有的待办事项所用的菜单
export default function EditTodoItemMenu(props){
    // 整合上面的css style，属于material ui api
    const classes = useStyles();

    // 设置待办事项截止时间的初始值，初始值为现在的时间往后三小时
    let temp = new Date();
    temp.addHours(3);
    // 查询了官方的Date API：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    temp.setSeconds(0,0);

    // 使用useState() react hook来为当前component添加states和更改states的函数们
    const [newContent, setNewContent] = useState(""); // 每当用户更改内容框中的文字，newContent会跟着更新，初始值为空字符串
    const [newDueTime, setNewDueTime] = useState(temp); // 设置待办事项截止时间用，初始值为现在的时间往后三小时
    const [error, setError] = useState(''); // 当编辑出现错误时使用，初始值空字符串
    const [newPriority, setNewPriority] = useState(priorities.GENERAL); // 设置新待办事项的优先级，初始值为普通优先级
    // 使用useDispatch() hook 来让当前component可以去通过dispatch action来更改redux中的states
    const dispatch = useDispatch();

    // 当用户在编辑内容文本框时触发
    const handleContentChange = (event) => {
        setNewContent(event.target.value);
        dispatch(todoActions.setError(""));
    }

    // 当用户在编辑截止时间条时触发
    const handleDateTimeChange = (event) => {
        //console.log(event);
        setNewDueTime(event);
    }

    // 当用户确认添加新条目时触发
    const handleClick = (e) => {
        if(newContent.length === 0){
            setError("代办事项内容不能为空"); // 当用户忘记输入待办内容时报错
            return;
        }
        const newItem = {
            id: new Date(),
            content: newContent,
            dueTime: newDueTime,
            priority: newPriority,
        }
        dispatch(todoActions.addTodoItem(newItem)); // 将新创建好的条目添加到redux中
        dispatch(todoActions.toggleCreateNew());
    }

    // 当用户取消添加新条目时触发
    const hideMenu = () => {
        dispatch(todoActions.toggleCreateNew());
    }

    // 将程序中的优先级翻译成中文显示在页面上
    const translatePriority = () => {
        if(newPriority === priorities.GENERAL){
            return "普通";
        }
        if(newPriority === priorities.IMPORTANT){
            return "重要";
        }
        if(newPriority === priorities.URGENT){
            return "紧急";
        }
    }

    // 当用户设置当前优先级为紧急时触发
    const setUrgent = () => {
        setNewPriority(priorities.URGENT);
    }

    // 当用户设置当前优先级为重要时触发
    const setImportant = () => {
        setNewPriority(priorities.IMPORTANT);
    }

    // 当用户设置当前优先级为一般时触发
    const setGeneral = () => {
        setNewPriority(priorities.GENERAL);
    }

    return (
        <Container component="main" maxWidth="sm" >
            <form className={classes.form}>
                <TextField
                    id="content"
                    value={newContent}
                    onChange={handleContentChange}
                    margin="normal"
                    error={error != ''}
                    placeholder={error}
                    required
                    fullWidth
                    label="待办事项内容"
                    multiline
                    variant="outlined"
                />

                <div>请选择截止时间：</div>

                <DateTimePicker
                    onChange={handleDateTimeChange}
                    value={newDueTime}
                    disableClock={true}
                />

                <List>
                    <ListItem style={{backgroundColor: blue[50]}}>
                        <ListItemText primary={"请选择优先级"} />

                        <ListItemSecondaryAction className={classes.nested}>
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
                        确认添加
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