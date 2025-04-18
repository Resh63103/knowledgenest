package com.knowledgenest.controller;

import com.knowledgenest.entity.Memo;
import com.knowledgenest.repository.MemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memos")
public class MemoController {

    @Autowired
    private MemoRepository memoRepository;

    @GetMapping
    public List<Memo> getAllMemos() {
        return memoRepository.findAll();
    }

    @PostMapping
    public Memo createMemo(@RequestBody Memo memo) {
        return memoRepository.save(memo);
    }
}