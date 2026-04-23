@RestController
@RequestMapping("/api/risks")
public class RiskReportController {

    @Autowired
    private RiskReportService service;

    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(
        @PathVariable Long id,
        @Valid @RequestBody RiskReportRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.softDelete(id);
        return ResponseEntity.ok("Report deleted successfully");
    }

    
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String q) {
        return ResponseEntity.ok(service.search(q));
    }
}