const express = require('express');

const server = express();

server.use(express.json());

const projects = [ //estrutura de dados da api
  {
    id: "0",
    title: "New Project 0",
    tasks: ["Task00"]
  }
];

function checkProjectInArray(req, res, next) {
  const id = req.params.id; // receber o id dos params

  const findProject = projects.find(item => item.id === id);
  //passa o objeto encontrado para uma nova variável

  const findIndex = projects.findIndex(item => item.id === id);
  //retorna o indice do vetor do objeto encontrado

  if (!findProject) {
    return res.status(400).json({ error: 'Project does not exist' });
  }
  req.project = findProject;
  //armazena o objeto na requisição

  req.findIndex = findIndex;
  //armazena o index na requisição

  return next();
}

server.use((req, res, next) => {

  console.count('Current number of requsitions: ');
  console.log(`Method ${req.method}; URL ${req.url}`);
  next();

})

server.get('/projects', (req, res) => {
  return res.json(projects); //retorna todos os projetos
})

server.get('/projects/:id', checkProjectInArray, (req, res) => {
  return res.json(req.project); //retorna somente o projeto do id específico 
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body; //captura o id e o title do body request

  projectNew = { id, title, tasks: [] };
  //instancia um objeto com os sequintes atributos

  projects.push(projectNew); //adiciona o novo objeto no vetor projects

  return res.json(projects); //retorna todos os projetos
})

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const { title } = req.body; //captura o title do body request
  const indexVector = req.findIndex; //recebe o valor do index do vetor

  projects[indexVector].tasks.push(title);
  //adiciona uma nova tarefa no vetor tarefa

  return res.json(projects[indexVector]);
  //retorna o projeto específico com uma nova tarefa
})

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const indexVector = req.findIndex; //recebe o valor do index do vetor
  const { title } = req.body; //captura o title do body request

  projects[indexVector].title = title; //altera o title de um projeto especifico

  return res.json(projects[indexVector]);
  //retorna o projeto especifico com o title atualizado
})

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const indexVector = req.findIndex; //recebe o valor do index do vetor

  projects.splice(indexVector, 1);
  //remoção de um elemento espicifico do vetor projetos

  return res.send(); //retorna o codigo http
})

server.listen(3000);