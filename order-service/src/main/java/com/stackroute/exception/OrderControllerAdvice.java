package com.stackroute.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class OrderControllerAdvice {

    @ExceptionHandler(value = OrderDoesNotExistException.class)
    public ResponseEntity<String> notFoundException(OrderDoesNotExistException e) {
        return new ResponseEntity<>("ControllerAdvice: Order Does Not Exist Exception.\n" +
                e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = OrderAlreadyExistsException.class)
    public ResponseEntity<String> alreadyExistsException(OrderAlreadyExistsException e) {
        return new ResponseEntity<>("ControllerAdvice: Order Already Exists Exception.\n" +
                e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<String> exception(Exception e){
        return new ResponseEntity("ControllerAdvice: Internal Server Error.\n" +
                e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
