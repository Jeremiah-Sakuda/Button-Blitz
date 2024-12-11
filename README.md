# Button Blitz

## Project Category
Animated Game

## Project Type
Web App

## Project Description
A fun, engaging web game where players press a button to score points, unlock upgrades, and improve focus. Great for people with ADHD!

## Group Members
Each group member should add their name here after accepting the invite:
- **Member 1**: Jeremiah Somoine
- **Member 2**: Salome Mokuwa
- **Member 3**: Krista Smith
- **Member 4**: Ngoye Diop
- **Member 5**: Tahira Smith

## Role Assignments

| Name      | Project Lead | Front End | Back End (Role 1) | Documenter | Tester | Total |
|-----------|--------------|-----------|-------------------|------------|--------|-------|
| Salome    | 50           | 25        | 0                 | 0          | 25     | 100   |
| Tahira    | 0            | 0         | 50                | 25         | 25     | 100   |
| Jeremiah  | 50           | 25        | 25                | 0          | 0      | 100   |
| Ngoye     | 0            | 50        | 0                 | 25         | 25     | 100   |
| Krista    | 0            | 0         | 25                | 50         | 25     | 100   |
| **Total** | **100**      | **100**   | **100**           | **100**    | **100**| **100** |


## Issue Status
Issue 6 has been completed. The new Issue and mielstone have been made.

## CI/CD Pipeline

This project uses GitLab CI/CD to validate HTML and CSS files on every push to the repository.

### Pipeline Overview
1. **HTML Validation**: Ensures `index.html` adheres to web standards.
2. **CSS Validation**: Ensures `styles.css` follows best practices.

### Configuration
The `.gitlab-ci.yml` file defines the pipeline:
```yaml
stages:
  - test

validate-html:
  stage: test
  image: node:14
  script:
    - npm install -g htmlhint
    - htmlhint index.html
```

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://agile.bu.edu/gitlab/ec327/projects/group10project.git
git branch -M master
git push -uf origin master
```






