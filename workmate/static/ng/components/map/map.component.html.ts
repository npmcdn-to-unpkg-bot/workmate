export const htmlTemplate = `
    
    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom" [disableDefaultUI]="false" [zoomControl]="true">
        
        <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="" [markerDraggable]="false">
        
            <sebm-google-map-info-window>
                <strong>{{lat}}, {{lng}}</strong>
            </sebm-google-map-info-window>
        
        </sebm-google-map-marker>
    
    </sebm-google-map>
    
`