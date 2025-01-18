const prompt = document.getElementById('custom-prompt');
const promptCancelBtn = document.getElementById('prompt-cancel');
const promptOkBtn = document.getElementById('prompt-ok');
const promptInput = document.getElementById('prompt-input');
const vaultContainer = document.getElementById('vault-container');


vaultContainer.style.display = 'none';


function showAlert(message) {
    const alertContainer = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;
    alertContainer.style.display = 'block'; 
}

const alert_close = document.getElementById('alert-close');
alert_close.addEventListener('click', ()=>{
    const alertContainer = document.getElementById('custom-alert');
    alertContainer.style.display = 'none'; 
});

let website = '';
let password = '';
function update(key, value) {
    const alertContainer = document.getElementById('update-custom-alert');
    const alertMessage = document.getElementById('update-alert-message');
    website = key;
    password = value;
 
    alertMessage.textContent = "Password exist \n Update Password";
    alertContainer.style.display = 'block';
}

const update_alert_close = document.getElementById('update-alert-close');
update_alert_close.addEventListener('click', ()=>{
    const alertContainer = document.getElementById('update-custom-alert');
    console.log('close button clicked');
    
    alertContainer.style.display = 'none';
});
const update_alert_update = document.getElementById('update-alert-update');
update_alert_update.addEventListener('click', ()=>{
    const alertContainer = document.getElementById('update-custom-alert');

    console.log(`website : ${website}`);
    console.log(`password : ${password}`);

    console.log(`website : ${website}  password after : ${btoa(password)}`);
    localStorage.setItem(`${website}`,`${btoa(password)}`);
    showAlert('Password Updated Successfully');
    alertContainer.style.display = 'none';
});




function showPrompt() {
    prompt.classList.remove('hidden');
    promptInput.value = '';
};


function hidePrompt() {
    prompt.classList.add('hidden');
}

function postPromptActions(isSuccess) {
  

    if (isSuccess) {
     
        const rangeInput = document.getElementById('custom-range');
        const rangeValueDisplay = document.getElementById('range-value');
        let length = 13;
      
        rangeInput.addEventListener('input', () => {
            rangeValueDisplay.textContent = rangeInput.value;
            length = rangeInput.value;
            
        });
    
        const generate_password_btn = document.getElementById('generate-password-btn');
        const generated_password_input = document.getElementById('generated-password');
        generate_password_btn.addEventListener('click', ()=>{
        
            if(length <= 7){
                showAlert(`Length must be 8-32`);
            }else{
                const lower = "abcdefghijklmnopqrstuvwxyz";
                const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const numbers = "0123456789";
                const specials = "!@#$%^&*()_+[]{}|;:',.<>?";
                const allChars = lower + upper + numbers + specials;
        
                let password = lower[Math.floor(Math.random() * lower.length)] +
                            upper[Math.floor(Math.random() * upper.length)] +
                            numbers[Math.floor(Math.random() * numbers.length)] +
                            specials[Math.floor(Math.random() * specials.length)];
        
                for (let i = 0; i < length - 4; i++) {
                password += allChars[Math.floor(Math.random() * allChars.length)];
                } 
                password = password.split('').sort(() => Math.random() - 0.5).join('');
                generated_password = password;
             
                generated_password_input.value = generated_password;
             }
        });
        
    
        const save_btn = document.getElementById('save-btn');
        save_btn.addEventListener('click', ()=>{
     
            const website = document.getElementById('save_website').value; 
            document.getElementById('save_website').value = '';      
           
          
            let password = document.getElementById('password').value;   
            document.getElementById('password').value = '';    
         
            if(!website || !password){
                showAlert(`Enter Website and Password`);
            }else{
                saveANDcheckINlocalstorage(website,password); 
            }
        });
        function saveANDcheckINlocalstorage(key, value) {
        
            var website = localStorage.getItem(`${key}`); 
           
            if(!website){
                localStorage.setItem(`${key}`,`${btoa(value)}`);
                showAlert("Password saved Successfully!");
            }else{
                update(key, value);
              
            }       
        }
   
        const search_btn = document.getElementById('search-btn');
        search_btn.addEventListener('click', ()=>{
            const search = document.getElementById('search').value; 
            let password = localStorage.getItem(`${search}`);
            if(password){
           
                document.getElementById('search').value = atob(password);
            }else{
                document.getElementById('search').value = "No Password Found";
            }
        });
     
        const delete_btn = document.getElementById('delete-btn');
        delete_btn.addEventListener('click', ()=>{
            const search = document.getElementById('search').value; 
            let password = localStorage.getItem(`${search}`);
            if(password){
                localStorage.removeItem(`${search}`);
                document.getElementById('search').value = '';
                showAlert('Password Deleted');
            }else{
                document.getElementById('search').value = "No website Found";
            }
        });
     
        const download_btn = document.getElementById('download-password-btn');
        download_btn.addEventListener('click', ()=>{
       
            let data = "";
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    data += `${key}\t:  ${atob(localStorage.getItem(key))}\n`; 
                }
            }

           
            const blob = new Blob([data], { type: 'text/plain' });

      
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'PasswordsFile.txt';
            link.click();
        });
       
    } else {
      
        vaultContainer.style.display = 'none';
      
    }
};


function checknSave_password(enteredPassword) {
    const savedPassword = localStorage.getItem('Password');

    if (!savedPassword) {
       
        localStorage.setItem('Password', `${btoa(enteredPassword)}`);
        showAlert(`Vault Password set successfully! ${enteredPassword}`);
        vaultContainer.style.display = 'block';
        hidePrompt(); 
        postPromptActions(true);
    } else {
      
        if (enteredPassword === atob(savedPassword)) {
            vaultContainer.style.display = 'block'; 
            hidePrompt(); 
            postPromptActions(true);
        } else {
            showAlert('Incorrect Password. Try again.');
            promptInput.value = ''; 
            postPromptActions(false);
        }
    }
};




promptOkBtn.addEventListener('click', () => {
    const enteredPassword = promptInput.value.trim(); 
    if (enteredPassword) {
        checknSave_password(enteredPassword);
    } else {
        showAlert('Password cannot be empty!');
    }
});

promptCancelBtn.addEventListener('click', () => {
    vaultContainer.style.display = 'none'; 
    hidePrompt();
});

window.onload = showPrompt; 


