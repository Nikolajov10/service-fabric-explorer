//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------

import * as $ from "jquery";
import { IClusterList } from "sfx.cluster-list";

(async() => {
    let cluster = localStorage.getItem("cluster");
    localStorage.removeItem("cluster");

    $(document).ready(() => {
        $(".modal-title").html("Move Cluster " + cluster);
        $(".modal").slideDown(150);
        let folders = JSON.parse(localStorage.getItem("folders"));
        localStorage.removeItem("folders");
        let select = $("#input-select-folder");
        for(let folder of folders) {
            let $item = $(`<option value="${folder.label}">${folder.label}</option>`);
            select.append($item);
        }
        let $item = $(`<option value="new_folder">Create New Folder</option>`);
        select.append($item);
    });

    $("#input-select-folder").change(async () => {
        let folder: string = $("#input-select-folder").val().toString();
        if(folder === "new_folder") {
            $("#new_folder").css("visibility", "visible");
        } else {
            $("#new_folder").css("visibility", "hidden");
        }
    });

    $("#btn-move-cluster").click(async () => {

        try {


            let folder: string = $("#input-select-folder").val().toString();
            let new_folder:string = $("#new-folder-label").val().toString();
            const list = await sfxModuleManager.getComponentAsync<IClusterList>("cluster-list");
            if(new_folder) {
                await list.newFolderItemAsync(new_folder);
                await list.moveClusterListItem(cluster, new_folder);
            } else {
                await list.moveClusterListItem(cluster, folder);
            }
            window.close();

        } catch(error) {
            alert("Error Occured");

        }
    });

    $("#btn-exit").click(() => {
        window.close();
    });
})();
