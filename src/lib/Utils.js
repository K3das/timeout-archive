

export const prettyTime = (unix) => {
    return new Date(unix).toLocaleString("default",
        { year: "numeric", month: "short", day: "numeric", hour12: false, hour: "numeric", minute: "numeric" }
    )
}