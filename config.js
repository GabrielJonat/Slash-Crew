let player1 = 'Anak'
let player2 = 'Kelev'
let combinations = [['Anak','Kelev'],['Kelev','Michael the Duck']]

function handleSubmit(event,idForm,idVeredict) {
    event.preventDefault(); // Prevent form from submitting normally
    var selectElement = document.getElementById(idForm);
    var selectedOption = selectElement.options[selectElement.selectedIndex].text;
    var palyerImage = document.getElementById(idVeredict)
    var errorAlert = document.getElementById('error')
    var playButton = document.getElementById('play')

    if(selectedOption === 'Anak'){

        palyerImage.innerHTML = `<img src="./images/anak_lost.png" alt="" style="width: 300px; height: auto;">`
    } else
    if(selectedOption === 'Kelev'){

        palyerImage.innerHTML = `<img src="./images/Kelev_defeat.png" alt="" style="width: 1000px;"></img>`
    } else
    if(selectedOption === 'Michael the Duck'){

        palyerImage.innerHTML = `<img src="./images/Mikey_defeat.png" alt="" style="width: 1000px;"></img>`
    }

    if(selectElement.id == 'sel1')

        player1 = selectedOption

    else

        player2 = selectedOption

    if(player1===player2)

        errorAlert.innerHTML = `<strong><p class="text-danger" style="margin-left: 270px; font-size: 200% ">Please select two different Players</p></strong>`

    else

        errorAlert.innerHTML = ''

    
    if(combinations[0].includes(player1) && combinations[0].includes(player2)){

            playButton.innerHTML = `<a style="width: 500px; margin-left: 600px; height: 80px; text-align: center; margin-bottom: 20px; font-size: 40px;" class=" my-3 btn btn-primary" href="./index.html">Jogar</a>`
        }
    else
    if(combinations[1].includes(player1) && combinations[1].includes(player2)){

            playButton.innerHTML = `<a style="width: 500px; margin-left: 600px; height: 80px; text-align: center; margin-bottom: 20px; font-size: 40px;" class=" my-3 btn btn-primary" href="./index2.html">Jogar</a>`
        } 

}