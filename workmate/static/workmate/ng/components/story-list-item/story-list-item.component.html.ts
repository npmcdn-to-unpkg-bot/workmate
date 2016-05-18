export const htmlTemplate = `

    <div class="item">
        <div class="content">
            <p>{{ story.title }}</p>
            <div class="extra">
                <div class="ui basic small label"><i class="star icon"></i>{{ story.effort }}</div>
                <div class="ui basic small label">Some useful tag</div>
                <button class="ui right floated mini button">Start</button>
            </div>
        </div>
    </div>
    
`