export const userDrawerStore = defineStore("drawer",{
    state: () => ({visible:false}),
    actions:{
        togle(){
            this.visible = !this.visible
        }
    }

})