import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service';

export const addNote = async (req, res, next) => {
  try {
    const data = await noteService.addNote(req.body,req.body.user_id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'note created'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};


export const getAllNotes = async (req,res,next)=>{
    try{
        const data = await noteService.getAllNotes(req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}

export const getNotes = async (req,res,next)=>{
    try{
        const data = await noteService.getNotes(req.params._id,req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'updated'
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}

export const updateNote = async (req,res,next)=>{
    try{
        const data = await noteService.updateNote(req.params._id,req.body,req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'updated'
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}


export const deleteNote = async (req,res,next)=>{
    try{
        const data = await noteService.deleteNote(req.params._id,req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'updated'
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}


export const achiveNote = async (req,res,next)=>{
    try{
        const data = await noteService.achiveNote(req.params._id,req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'updated'
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}

export const colorNote = async (req,res,next)=>{
    try{
        const data = await noteService.colorNote(req.params._id,req.body);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'updated'
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}

export const deleteforever = async (req,res,next)=>{
    try{
        const data = await noteService.deleteforever(req.params._id,req.body.user_id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'updated'
        })
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
}