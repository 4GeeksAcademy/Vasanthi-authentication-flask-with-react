const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			loginMessage: null,
			token: null,
			homeMessage: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getMessage: async () => {
				try{
					const store = getStore()
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello",  {
						method: 'GET',
						headers: {
							"Authorization": "Bearer "+ store.token
					    },
					})
					const data = await resp.json()
					setStore({ homeMessage: data.msg })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			handleLogoutSession: () => {
				localStorage.setItem('access_token', null)
                setStore({token: null})
			},
			syncSessionStore: () => {
               const token = localStorage.getItem('access_token')
			   console.log(token)
			   if (token !== 'null' && token !== undefined) {
				 setStore({token: token})
			   }
			},
			
			getUserToken: async (obj) => {		
				try{
					const res = await fetch("https://upgraded-memory-7g6rg5pgjpvcxpxq-3001.app.github.dev/api/token", {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify(obj)
					})
					const data = await res.json()
					if (data.access_token) {
						localStorage.setItem('access_token', data.access_token)
						setStore({token: data.access_token})
						setStore({ loginMessage: 'User Login successfully' });
					}
					return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				
			},
			getUserAdded: async (obj) => {
				try{
					const res = await fetch("https://upgraded-memory-7g6rg5pgjpvcxpxq-3001.app.github.dev/api/signup", {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(obj)
					})
					const data = await res.json();
					setStore({ message: data.msg });
					return data
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				
			}
		}
	};
};

export default getState;
