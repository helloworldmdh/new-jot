export default {
    // Apparently it's good practice to have the mutation methods accessed through here
    // you are allowed to give them the same names
    // called in any component with this.$store.dispatch('setUserEmail', payload);
    setUserEmail(context, payload){
        context.commit('setUserEmail', payload);
    }
};