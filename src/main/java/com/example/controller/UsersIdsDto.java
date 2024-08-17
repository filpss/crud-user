package com.example.controller;

import java.util.List;

public class UsersIdsDto {
    private List<Long> idList;

    public UsersIdsDto() {
    }

    public UsersIdsDto(List<Long> idList) {
        this.idList = idList;
    }

    public List<Long> getIdList() {
        return idList;
    }

    public void setIdList(List<Long> idList) {
        this.idList = idList;
    }
}
