import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
//import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useDispatch, useSelector, connect } from "react-redux";
import ListSubheader from '@material-ui/core/ListSubheader';
import priorities from "../Constants/priorities";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import * as todoActions from '../Actions/todoActions'
import EditTodoItemMenu from "./EditTodoItemMenu";

const useStyles = makeStyles((theme) =>({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    note: {
        width: '100%',
        backgroundColor: theme.palette.background.default
    }
}));

function TodoList({todoItems, edit, currItem, sortedPriority, sortedDueTime, handleEdit, handleDelete}) {
    const classes = useStyles();
    return (
        <Container>
            <List
                className={classes.root}
                subheader={
                    <ListSubheader component="div" color="inherit">
                        待办事项：
                    </ListSubheader>
                }>

                {!todoItems.length
                    ?
                    <Typography className={classes.note} align="center" variant="h6" color="primary">无任何待办事项</Typography>
                    :
                    (todoItems.map(item => {
                            const editForm = () => {
                                if(edit && (currItem == item)) {
                                    //console.log("item match found");
                                    return (<EditTodoItemMenu/>);
                                }
                                //console.log("item does not match");
                                return (<div/>);
                            };

                            return (
                                <div key={item.id}>
                                    <ListItem className={classes.note}>
                                        <ListItemIcon>
                                            <FiberManualRecordIcon fontSize="large" style={
                                                (item.priority === priorities.URGENT)? {color: red[500]}: ((item.priority === priorities.IMPORTANT)? {color: orange[500]}: {color: blue[500]})
                                            } />
                                        </ListItemIcon>

                                        <ListItemText primary={item.content} secondary={item.dueTime.toString().substring(0,21)} />

                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {editForm()}
                                </div>
                            )
                        }))
                }
                <ListItem>
                    <ListItemIcon>
                        <FiberManualRecordIcon fontSize="large" style={{color: red[500]}}/>
                        <FiberManualRecordIcon fontSize="large" style={{color: orange[500]}}/>
                        <FiberManualRecordIcon fontSize="large" style={{color: blue[500]}}/>
                    </ListItemIcon>

                    <ListItemText secondary="代表优先级：紧急，重要，一般" />
                </ListItem>

                { sortedPriority? <ListItem> <ListItemText secondary="已按照优先级排序" /> </ListItem> : <div/>}
                { sortedDueTime? <ListItem> <ListItemText secondary="已按照截止时间排序" /> </ListItem> : <div/>}
            </List>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        todoItems: state.todoItems,
        edit: state.edit,
        currItem: state.currItem,
        sortedPriority: state.sortedPriority,
        sortedDueTime: state.sortedDueTime
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEdit: (item) => {
            dispatch(todoActions.setCurrItem(item));
            dispatch(todoActions.setNewContent(item.content));
            dispatch(todoActions.setNewPriority(item.priority));
            dispatch(todoActions.setNewDueTime(item.dueTime));
            dispatch(todoActions.toggleEdit());
        },
        handleDelete: (item) => {
            dispatch(todoActions.deleteItem(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);


