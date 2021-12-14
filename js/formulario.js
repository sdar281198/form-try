//importar nuestras etiquetas
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expresiones = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	user :false,
	name :false,
	password: false,
	mail:false,
	phone:false
}

const validateForm = (e) => {
	switch (e.target.name){//target es el name del input
		case 'user':

				validarCampo(expresiones.user, e.target, 'user');


		break;
		case 'name':

				validarCampo(expresiones.name, e.target, 'name');


		break;
		case 'password':

				validarCampo(expresiones.password, e.target, 'password');
				validarPassword2();

		break;
		case 'password2':

				validarPassword2();

		break;
		case 'mail':

				validarCampo(expresiones.email, e.target, 'mail');

		break;
		case 'phone':

				validarCampo(expresiones.phone, e.target, 'phone');

		break;
	}

}

const validarCampo = (expresion, input, campo) =>{
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('form__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} .form_input_error`).classList.remove('form_input_error-active');
		campos[campo] = true;

	}else{
		document.getElementById(`grupo__${campo}`).classList.add('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .form_input_error`).classList.add('form_input_error-active');
		campos[campo] = false;
	}
}

const validarPassword2 = () =>{
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if (inputPassword1.value !== inputPassword2.value) {

		document.getElementById(`grupo__password2`).classList.add('form__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('form__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .form_input_error`).classList.add('form_input_error-active');
		campos['password'] = false;


	}else{
		document.getElementById(`grupo__password2`).classList.remove('form__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('form__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .form_input_error`).classList.remove('form_input_error-active');
		campos['password'] = true;

	}
}


inputs.forEach((input, i) => {
	input.addEventListener('keyup', validateForm );
	input.addEventListener('blur', validateForm );

});

//Hacer que la pantlla no se recargue al dar enviar
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const terms = document.getElementById('terms');

	if (campos.user && campos.name && campos.password && campos.mail && campos.phone && terms.checked) {
		form.reset();

		document.getElementById('form__message-succees').classList.add('form__message-succees-active');

		setTimeout(() => {
			document.getElementById('form__message-succees').classList.remove('form__message-succees-active');

		}, 5000);

		document.querySelectorAll(".form__grupo-correcto").forEach((icon) => {
			icon.classList.remove("form__grupo-correcto");

		});


	}else{
		document.getElementById("form__message").classList.add('form__message-active');
	}
});

form.addEventListener('click', guardarDatos);

function guardarDatos(){
	let user = document.querySelector("#user").value;
	let name= document.querySelector("#name").value;
	let password = document.querySelector("#password").value;
	let mail = document.querySelector("#mail").value;
	let phone = document.querySelector("#phone").value;
	let guardar = JSON.stringify({user,name,password,mail, phone});

	localStorage.setItem('datos', guardar);
	let str = localStorage.getItem('datos');
	console.log(str);

}
