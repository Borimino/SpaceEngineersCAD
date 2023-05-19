const text = `<?xml version="1.0"?>
<Definitions xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <ShipBlueprints>
        <ShipBlueprint xsi:type="MyObjectBuilder_ShipBlueprintDefinition">
            <Id Type="MyObjectBuilder_ShipBlueprintDefinition" Subtype="(?GRID_NAME?)" />
            <CubeGrids>
                <CubeGrid>
                    <SubtypeName />
                    <PersistentFlags>CastShadows InScene</PersistentFlags>
                    <PositionAndOrientation>
                        <Position x="0" y="0" z="0" />
                        <Forward x="1" y="0" z="0" />
                        <Up x="0" y="1" z="0" />
                    </PositionAndOrientation>
                    <LocalPositionAndOrientation xsi:nil="true" />
                    <GridSizeEnum>Large</GridSizeEnum>
                    <CubeBlocks>(?BLOCKS?)
                    </CubeBlocks>
                    <DisplayName>(?GRID_NAME?)</DisplayName>
                    <DestructibleBlocks>true</DestructibleBlocks>
                    <IsRespawnGrid>false</IsRespawnGrid>
                    <LocalCoordSys>0</LocalCoordSys>
                    <TargetingTargets />
                </CubeGrid>
            </CubeGrids>
            <EnvironmentType>None</EnvironmentType>
            <WorkshopId>0</WorkshopId>
            <Points>0</Points>
        </ShipBlueprint>
    </ShipBlueprints>
</Definitions>`

export {text};
