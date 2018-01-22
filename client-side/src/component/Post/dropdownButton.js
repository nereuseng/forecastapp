export function dropdownButton(){
        document.getElementById("dropdownItemSelector").classList.toggle("show");
}

export function clickOutside(event) {
        if (!event.target.matches('.dropdownButton')){
                let dropdowns = document.getElementsByClassName('dropdownItem');
                // 判定下拉選單合起來的code放在PostItem的componentdidmount
                for (let i = 0; i < dropdowns.length; i++){
                        let openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')){
                                openDropdown.classList.remove('show');
                        }
                }
        }
}
