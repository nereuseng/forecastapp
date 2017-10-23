export function dropdownButton(){
        document.getElementById("dropdownItemSelector").classList.toggle("show");
}

export function clickOutside(event) {
        if (!event.target.matches('.dropdownButton')){
                let dropdowns = document.getElementsByClassName('dropdownItem');
                // console.log(dropdowns);
                for (let i = 0; i < dropdowns.length; i++){
                        let openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')){
                                openDropdown.classList.remove('show');
                        }
                }
        }
}
