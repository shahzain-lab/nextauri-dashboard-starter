import { ReactElement, useEffect, useState } from "react"
import FullLayout from "../../src/layouts/full/FullLayout"
import { Box, Button, Stack, Typography } from "@mui/material"
import CustomTextField from "../../src/components/forms/theme-elements/CustomTextField"

// Database
import Database from 'tauri-plugin-sql-api';
import AccountsTable from "../../src/components/dashboard/accounts";

const AddSale = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accounts, setAccounts] = useState<any[]>([])
    const [state, setState] = useState<Boolean>(false)

    const handleAddAccount = async () => {
        if(email && password && username) {
            const db = await Database.load("postgres://postgres:DB_PASSWORD@localhost/PORT")
    
            // create account
            const date = '2016-06-22 19:10:25'
    
            await db.execute(`INSERT INTO accounts (username, email, password, created_on)
                VALUES ('${username}', '${email}', '${password}', '${date}')
            `)
            setState(!state)
        } else {
            alert('PLEASE! Fill up the from')
        }
    }

    useEffect(() => {
        const accounts = async () => {
            const db = await Database.load("postgres://postgres:DB_PASSWORD@localhost/PORT")
            const _accounts: any[] = await db.select('SELECT * FROM accounts')
            setAccounts(_accounts)
        }
        accounts()
    }, [state])

    return (
        <Stack>
          <Box>
            <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
            >
            Username
            </Typography>
            <CustomTextField onChange={(e:any) => setUsername(e.target.value)} variant="outlined" fullWidth />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component={"label"}
              htmlFor="email"
              mb="5px"
            >
                Email
            <CustomTextField onChange={(e:any) => setEmail(e.target.value)} variant="outlined" fullWidth />
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component={"label"}
              htmlFor="email"
              mb="5px"
            >
               Password
            <CustomTextField onChange={(e:any) => setPassword(e.target.value)} type="password" variant="outlined" fullWidth />
            </Typography>
          </Box>
          <Button onClick={handleAddAccount} sx={{my:"5px"}} variant="contained">+ Add Account</Button>

            <AccountsTable products={accounts} />
     </Stack>
    )
}


export default AddSale

AddSale.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>
}