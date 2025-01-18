# SafePassExtension
The password management chrome extension provides a user-friendly interface for managing passwords.

# SafePassExtension (Chrome Extension)

This document provides a comprehensive overview Extension responsible for a password management application. The application allows users to generate, store, retrieve, update, and delete passwords securely.

## Table of Contents
- [Variables](#variables)
- [Functions](#functions)
    - [showAlert](#showalert)
    - [update](#update)
    - [showPrompt](#showprompt)
    - [hidePrompt](#hideprompt)
    - [generateHash](#generatehash)
    - [postPromptActions](#postpromptactions)
    - [checknSave_password](#checknsave_password)
- [Event Listeners](#event-listeners)
- [Overall Functionality](#overall-functionality)

## Variables

- `prompt`: DOM element representing the custom password prompt.
- `promptCancelBtn`: DOM element for the cancel button in the prompt.
- `promptOkBtn`: DOM element for the OK button in the prompt.
- `promptInput`: DOM element for the input field in the prompt.
- `vaultContainer`: DOM element that holds the password vault interface.
- `alert_close`: DOM element for the close button of the alert.
- `update_alert_close`: DOM element for the close button of the update alert.
- `update_alert_update`: DOM element for the update button in the update alert.
- `website`: A string variable to hold the website name.
- `password`: A string variable to hold the password.

## Functions

### showAlert

Displays an alert message to the user. It takes a single parameter:
- `message`: The message to be displayed in the alert.

### update

Handles the update of an existing password. It takes two parameters:
- `key`: Name of the website.
- `value`: The new password for the website.

### checknSave_password

Checks if a password is already saved and validates the entered password. It takes a single parameter:
- `enteredPassword`: The password input by the user.

## Overall Functionality

The password management application provides a user-friendly interface for managing passwords. Users can generate passwords, save them securely, retrieve them using a search feature, and delete passwords they no longer need. The application utilizes the browser's local storage to save passwords in an encoded format for security. Additionally, alerts inform the user of successful actions and potential errors, enhancing the overall user experience. The application also includes a prompt for setting a vault password, ensuring that access to sensitive information is protected.

This documentation serves as a guide for understanding the code structure and functionality of the application, allowing developers to modify or extend its features as needed.

## 
you can add your own encryption algorithm instead.
