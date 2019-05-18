class PetitionForm {
    constructor(vnode) {
        this.name = ""
        this.description = ""
    }

    view () {
        return m("div.container", [
            m("div.row justify-content-center"), [
                m("div.col-sm-6", [
                    m("form", [
                        m("div.form-group", [
                            m("label", { for: "nameInput" }, "Nom de la pétition"),
                            m("input.form-control", { id: "nameInput", placeholder: "nom", oninput: (e) => { this.name = e.target.value } })

                        ]),
                        m("div.form-group", [
                            m("label", { for: "descripInput" }, "Description"),
                            m("textarea.form-control", {
                                id: "descripInput", placeholder: "description", oninput: (e) => {
                                    this.description = e.target.value
                                }
                            })
                        ]),
                        m("button.btn btn-primary", {
                            onclick: (e) => {
                                e.preventDefault()
                                m.request(
                                    {
                                        method: "POST",
                                        url: "https://tinypetition-dot-devcloud.appspot.com/_ah/api/petapi/v1/addPetition/",
                                        data: { name: this.name, description: this.description }
                                    }

                                ).then((result) => {
                                    console.log(result)
                                    m.route.set('/home')
                                }
                                )

                            }
                        }, "sauvegarder")
                    ]

                    )

                ])
            ]
        ])



    }

}