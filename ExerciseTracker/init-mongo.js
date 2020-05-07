db.createUser(
    {
        user: "username1",
        pwd: "pasword",
        roles: [
            {
                role: "readWrite",
                db: "db1"
            },
            {
                role: "readWrite",
                db: "test"
            }
        ]
    }
)