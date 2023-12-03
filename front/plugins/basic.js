import Vue from 'vue'
import 'animate.css'

Vue.mixin({
    methods: {
        uxaudio(audio_tone) {
            const done = '/audio/alert/done.ogg';
            const error = '/audio/secondary/error.ogg';
            const undone = '/audio/primary/undone.ogg';
            const warning = '/audio/secondary/warning.ogg';
            const predelete = '/audio/primary/delete_one.ogg';
            const postdelete = '/audio/primary/delete_two.ogg';
            if (audio_tone == 'done') {

                var audio = new Audio(done);
            }
            if (audio_tone == 'error') {

                var audio = new Audio(error);
            }
            if (audio_tone == 'undone') {

                var audio = new Audio(undone);
            }
            if (audio_tone == 'warning') {

                var audio = new Audio(warning);
            }
            if (audio_tone == 'postdelete') {

                var audio = new Audio(postdelete);
            }
            if (audio_tone == 'predelete') {

                var audio = new Audio(predelete);
            }
            audio.play();

        },
        showAddDataIndex(val, index) {
            let self = this;
            this.$buefy.dialog.prompt({
                message: `<b>Add Data</b> `,
                inputAttrs: {
                    placeholder: "Enter Value",
                    maxlength: 30,
                    value: this.name,
                },
                canCancel: ["escape", "outside"],
                trapFocus: true,
                confirmText: "Add",
                onConfirm: (value) => {
                    let formdata = { name: value, description: "" };
                    this.$axios
                        .post("/basic_master/" + String(val) + '/add', formdata)
                        .then(function (response) {
                            if (response.data.success) {
                                switch (val) {
                                    case "fabric_combination":
                                        self.data_fabric.push(response.data.data);
                                        self.$refs.fabric_combination[index].setSelected(
                                            response.data.data
                                        );
                                        break;
                                    case "product_category":
                                        self.data_product_category.push(response.data.data);
                                        self.$refs.product_category[index].setSelected(
                                            response.data.data
                                        );
                                        break;
                                    case "design_number":
                                        self.data_design_number.push(response.data.data);
                                        self.$refs.design_number[index].setSelected(
                                            response.data.data
                                        );
                                        break;
                                    case "print_technique":
                                        self.data_print_tec.push(response.data.data);
                                        self.$refs.print_tec[index].setSelected(response.data.data);
                                        break;
                                    case "uom":
                                        self.$refs.uom.setSelected(response.data.data);
                                        self.data_uom.push(response.data.data);
                                        break;
                                    case "tags":
                                        self.data_tags.push(response.data.data);
                                        break;
                                    default:
                                        break;
                                }
                                self.$buefy.snackbar.open({
                                    duration: 4000,
                                    message: response.data.success,
                                    type: "is-light",
                                    position: "is-top-right",
                                    actionText: "Close",
                                    queue: true,
                                    onAction: () => {
                                        self.isActive = false;
                                    },
                                });
                            } else {
                                if (response.data.message) {
                                    self.$buefy.snackbar.open({
                                        duration: 4000,
                                        message: response.data.message,
                                        type: "is-light",
                                        position: "is-top-right",
                                        actionText: "Close",
                                        queue: true,
                                        onAction: () => {
                                            self.isActive = false;
                                        },
                                    });
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
            });
        },
        showAddData(val) {
            let self = this;
            this.$buefy.dialog.prompt({
                message: `<b>Add Data</b> `,
                inputAttrs: {
                    placeholder: "Enter Value",
                    maxlength: 30,
                    value: this.name,
                },
                canCancel: ["escape", "outside"],
                trapFocus: true,
                confirmText: "Add",
                onConfirm: (value) => {
                    let formdata = { name: value, description: "" };
                    this.$axios
                        .post("/pim/basic_master/" + String(val) + '/add', formdata)
                        .then(function (response) {
                            if (response.data.success) {
                                self.uxaudio('done')
                                switch (val) {
                                    case "fabric_combination":
                                        self.data_fabric.push(response.data.data);
                                        self.$refs.fabric_combination.setSelected(
                                            response.data.data
                                        );
                                        break;
                                    case "product_category":
                                        self.data_product_category.push(response.data.data);
                                        self.$refs.product_category.setSelected(
                                            response.data.data
                                        );
                                        break;
                                    case "design_number":
                                        self.data_design_number.push(response.data.data);
                                        self.$refs.design_number.setSelected(
                                            response.data.data
                                        );
                                        break;
                                    case "print_technique":
                                        self.data_print_tec.push(response.data.data);
                                        self.$refs.print_tec.setSelected(response.data.data);
                                        break;
                                    case "uom":
                                        self.$refs.uom.setSelected(response.data.data);
                                        self.data_uom.push(response.data.data);
                                        break;
                                    case "tags":
                                        self.data_tags.push(response.data.data);
                                        break;
                                    default:
                                        break;
                                }
                                self.$buefy.snackbar.open({
                                    duration: 4000,
                                    message: response.data.success,
                                    type: "is-light",
                                    position: "is-top-right",
                                    actionText: "Close",
                                    queue: true,
                                    onAction: () => {
                                        self.isActive = false;
                                    },
                                });
                            } else {
                                self.uxaudio('undone')

                                if (response.data.message) {
                                    self.$buefy.snackbar.open({
                                        duration: 4000,
                                        message: response.data.message,
                                        type: "is-light",
                                        position: "is-top-right",
                                        actionText: "Close",
                                        queue: true,
                                        onAction: () => {
                                            self.isActive = false;
                                        },
                                    });
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
            });
        },
    }
})