export interface ReposData{
    id: number,
    name: string,
    full_name: string,
    updated_at: string
}

export interface ReposDetails{
    name: string,
    description: string,
    stargazers_count: number,
    forks_count: number,
    open_issues_count: number,
    language: string,
    updated_at: string,
    html_url: string
}